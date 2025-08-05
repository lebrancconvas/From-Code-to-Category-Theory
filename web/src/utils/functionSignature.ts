import ts from "typescript";

interface FunctionSignature {
  name: string;
  sourceTypes: string[],
  returnType: string
};

export function extractFunctionSignatures(code: string, fileName: string = "main"): FunctionSignature[] {
  const fullFileName = `${fileName}.ts`;

  const sourceFile = ts.createSourceFile(
    fullFileName,
    code,
    ts.ScriptTarget.Latest,
    true
  );

  const compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.CommonJS,
    strict: true
  };

  const compilerHosts: ts.CompilerHost = {
    getSourceFile: (fileName: string, languageVersion: ts.ScriptTarget) => fileName === "main.ts" ? sourceFile : undefined,
    writeFile: () => {},
    getCurrentDirectory: () => "",
    getDirectories: () => [],
    fileExists: (fileName: string) => fileName === "main.ts",
    readFile: (fileName: string) => fileName === "main.ts" ? code : "",
    getCanonicalFileName: (fileName: string) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    resolveModuleNameLiterals: undefined,
    getDefaultLibFileName: (options: ts.CompilerOptions) => ts.getDefaultLibFileName(options)
  };

  const program = ts.createProgram([`${fullFileName}`], compilerOptions, compilerHosts);

  const typeChecker = program.getTypeChecker();
  const signatures: FunctionSignature[] = [];

  function visit(node: ts.Node) {
    // Function Declaration.
    if(ts.isFunctionDeclaration(node)) {
      // Name
      const name = node.name?.getText(sourceFile) || "anonymous";

      // Source Types
      const sourceTypes = node.parameters.map(param => {
        if(param.type) {
          return param.type.getText(sourceFile);
        } else {
          try {
            const type = typeChecker.getTypeAtLocation(param);
            return typeChecker.typeToString(type);
          } catch(error) {
            return "any";
          }
        }
      });

      // Return Types
      let returnType = "void";
      if(node.type) {
        returnType = node.type.getText(sourceFile);
      } else {
        try {
          const signature = typeChecker.getSignatureFromDeclaration(node);
          if(signature) {
            returnType = typeChecker.typeToString(signature.getReturnType());
          }
        } catch(error) {
          returnType = "any";
        }
      }

      const signature = {
        name,
        sourceTypes,
        returnType
      };


      signatures.push(signature);
    }
    // Arrow Function Declaration.
    else if(ts.isVariableDeclaration(node) && node.initializer) {
      if(ts.isArrowFunction(node.initializer)) {
        const name = node.name.getText(sourceFile);
        const arrowFunction = node.initializer;


        const sourceTypes = arrowFunction.parameters.map(param => {
          if(param.type) {
            return param.type.getText(sourceFile);
          } else {
            try {
              const type = typeChecker.getTypeAtLocation(param);
              return typeChecker.typeToString(type);
            } catch(error) {
              return "any";
            }
          }
        });

        let returnType = "any";
        if(arrowFunction.type) {
          returnType = arrowFunction.type.getText(sourceFile);
        } else {
          try {
            const type = typeChecker.getTypeAtLocation(arrowFunction)
            const callSignatures = type.getCallSignatures();
            if(callSignatures.length > 0) {
              returnType = typeChecker.typeToString(callSignatures[0].getReturnType());
            }
          } catch(error) {
            returnType = "any";
          }
        }

        const signature = {
          name,
          sourceTypes,
          returnType
        };

        signatures.push(signature);
      }

    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return signatures;
};

export function getFunctionSignature(code: string): string {
  const signatures = extractFunctionSignatures(code);
  return JSON.stringify(signatures, null, 2);

};

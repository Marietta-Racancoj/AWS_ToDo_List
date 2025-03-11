export const API_URL = "https://j3mvz5yfwdbuaeqd4u6u4akaqa0uapct.lambda-url.us-east-1.on.aws/task";

//"http://localhost:3301/task";


// //COGNITO ROLE ADDED
// import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

// // AWS Region & Cognito Identity Pool ID
// const REGION = "us-west-1"; // Replace with your AWS region
// const IDENTITY_POOL_ID = "us-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"; // Replace with your Cognito Identity Pool ID
// const FUNCTION_NAME = "your-lambda-function"; // Replace with your Lambda function name

// // AWS Lambda client with Cognito IAM credentials
// const lambdaClient = new LambdaClient({
//   region: REGION,
//   credentials: fromCognitoIdentityPool({
//     clientConfig: { region: REGION },
//     identityPoolId: IDENTITY_POOL_ID,
//   }),
// });

// // Function to call Lambda securely with AWS IAM authentication
// export const invokeLambda = async (payload) => {
//   const params = {
//     FunctionName: FUNCTION_NAME,
//     Payload: JSON.stringify(payload),
//   };

//   try {
//     const command = new InvokeCommand(params);
//     const response = await lambdaClient.send(command);
//     return JSON.parse(new TextDecoder().decode(response.Payload));
//   } catch (error) {
//     console.error("Error invoking Lambda:", error);
//   }
// };




// //NO COGNITO YET
// import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

// // AWS Region & Lambda function details
// const REGION = "us-west-1"; // Replace with your region
// const FUNCTION_NAME = "your-lambda-function"; // Replace with your function name

// // Configure AWS Lambda client with IAM authentication
// const lambdaClient = new LambdaClient({
//   region: REGION,
//   credentials: fromCognitoIdentityPool({
//     clientConfig: { region: REGION },
//     identityPoolId: "us-west-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" // Replace with your Cognito Identity Pool ID
//   }),
// });

// // Function to call Lambda securely
// export const invokeLambda = async (payload) => {
//   const params = {
//     FunctionName: FUNCTION_NAME,
//     Payload: JSON.stringify(payload),
//   };

//   try {
//     const command = new InvokeCommand(params);
//     const response = await lambdaClient.send(command);
//     return JSON.parse(new TextDecoder().decode(response.Payload));
//   } catch (error) {
//     console.error("Error invoking Lambda:", error);
//   }
// };

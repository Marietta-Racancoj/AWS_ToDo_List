import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  DynamoDBDocumentClient,
  ScanCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

import crypto from "crypto"; //for generating a unique id


const client = new DynamoDBClient({ region: "us-west-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",
  });

  const response = await docClient.send(command);

  return response;
};

//Create task and generate a unique ID for the item from Dynamodb's built in crypto
export const createTasks = async (name, completed) => {
    const uuid = SubtleCrypto.randomUUID();
    const command = new PutCommand({
        TableName: "Tasks",
        Item: {
            id: uuid,
            name,
            completed,
        },
    })
    const response = await docClient.send(command);
    return response
};


export const updateTasks = async (id, name, completed) => {
    const command = new UpdateCommand({
        TableName: "Tasks",
        Key: {   //Dynamodb uses key to find which item to update
            id,  //the key I am using is id
        },
        ExpressionAttributeNames: {
            "#name": "name",
        },
        UpdateExpression: "set #name = :n, completed =:c", //:n and :c are placeholders to mean any value
        ExpressionAttributeValues: {
            ":n": name,      //:n maped to the name passed into function
            ":c": completed, //:c corresponds to the completed status
        },
        ReturnValues: "ALL_NEW",
    });
    const response = await docClient.send(command);
    return response;
};

export const deleteTasks = async (id) => {
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
  });

  const response = await docClient.send(command);

  return response;
};
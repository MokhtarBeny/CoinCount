import mongoose from "mongoose";
import request from "supertest";
import app from "../../src/app";
import dotenv from "dotenv";
import { afterEach, beforeEach, describe, it } from "node:test";
import connection from "../../src/utils/database";
dotenv.config();

const testDbName = process.env.DB_TEST_NAME as string;
beforeEach(async () => {
    await connection(testDbName);
});

afterEach(async () => {
    await mongoose.connection.close();
});
describe("GET /api/users/", () => {
    it("should return a list with all users", async () => {
        const res = await request(app).get("/api/users/");
        expect(res.statusCode).toBe(200);
    });

});

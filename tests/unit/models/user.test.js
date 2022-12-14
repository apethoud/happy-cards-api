const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const JWTSECRET = process.env.JWTSECRET;

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, JWTSECRET);
    expect(decoded).toMatchObject(payload);
  });
});

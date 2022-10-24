describe("POST /api/user/login", () => {
    it("should login the admin user", async () => {
      const res = await request(app).post("http://localhost:3000/api/user/login").send({
        email: "admin@gmail.com",
        password: "querty"
      });
      expect(res.statusCode).toBe(200);
    });
  });
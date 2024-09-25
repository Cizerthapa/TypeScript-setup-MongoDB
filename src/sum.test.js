const sum = require("./sum");
test("adds 1 + 2 and equals 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("Object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

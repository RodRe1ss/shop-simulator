/*
test("balance" ,fn, {argument1: arg1})
*/

const testFn = async ({ title ,fn, args }) => {
  try {
    const result = await fn(...args);
    console.log(`${title}: `, result);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
};

module.exports = testFn

(async function () {
  console.log(1)
}()).catch((err: Error) => {
  console.error(err)
  process.exit(1)
})

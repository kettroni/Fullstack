const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let amount = 0
  for (let index in blogs) {
    amount += blogs[index].likes
  }
  return amount
}

module.exports = {
  dummy,
  totalLikes
}

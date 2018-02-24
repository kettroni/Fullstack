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

const favoriteBlog = (blogs) => {
  let biggest = -1
  let favorite
  for (let index in blogs) {
    const temp = blogs[index].likes
    if (biggest < temp) {
      biggest = temp
      favorite = blogs[index]
    }
  }
  return favorite || 'no blogs to compare'
}

const mostBlogs = (blogs) => {
  const collection = {
    names: [],
    numbers: []
  }
  let amount = 0
  let most
  for (let index in blogs) {
    let contain = false
    let place
    const temp = blogs[index]
    for (let i = 0; i < collection.names.length; i++) {
      if (!contain) {
        if (collection.names[i] === temp.author) {
          contain = true
          place = i
        }
      }
    }
    if (contain) {
      collection.numbers[place]++
    } else {
      collection.names.push(temp.author)
      collection.numbers.push(1)
    }
  }

  const highestnumberindex = collection.numbers.indexOf(Math.max(...collection.numbers))
  if (highestnumberindex !== -1) {
    return (
      {
        author: collection.names[highestnumberindex],
        blogs: collection.numbers[highestnumberindex]
      }
    )
  } else {
    return 'no blogs'
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}

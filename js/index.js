// document.addEventListener("DOMContentLoaded", function() {});

const fetchAllBooks = () => {
	fetch("http://localhost:3000/books")
		.then((response) => response.json())
		.then((books) => {
			// do something with the req
			console.log(books)
			// for each book,  create a li tag and attach it to an ul element
			const ulElement = document.getElementById("list")
			books.forEach((book) => {
				const li = document.createElement("li")
				const textSpan = document.createElement("span")
				textSpan.textContent = book.title
				// console.log(book)
				// li.id = book.id

				textSpan.addEventListener("click", (event) => {
					console.log(event.target.textContent)
					console.log("inside event", book)
					const showPanel = document.getElementById("show-panel")
					const title = document.createElement("h1")
					const subtitle = document.createElement("h2")
					const author = document.createElement("h3")
					const description = document.createElement("p")
					const img = document.createElement("img")
					const likeButton = document.createElement("button")

					title.textContent = book.title
					subtitle.textContent = book.subtitle
					author.textContent = book.author
					description.textContent = book.description
					img.src = book.img_url
					img.alt = book.title
					likeButton.textContent = "LIKE"

					showPanel.innerHTML = ""
					// showPanel.removeChild(title)

					likeButton.addEventListener("click", (event) => {
						console.log("LIKED!")
						// we are =>
						const currentUser = {
							id: 1,
							username: "pouros",
						}

						console.log(book.users)
						book.users.push(currentUser)
						console.log("newusers", book.users)

						const patchReqObj = {
							method: "PATCH",
							headers: {
								"content-type": "application/json",
							},
							body: JSON.stringify({
								users: book.users,
							}),
						}

						fetch("http://localhost:3000/books/" + book.id, patchReqObj)
							.then((response) => response.json())
							.then((updatedBook) => {
								console.log(updatedBook)
							})
					})

					showPanel.append(
						title,
						subtitle,
						author,
						description,
						img,
						likeButton
					)
				})

				// console.log(li)
				li.append(textSpan)
				ulElement.appendChild(li)
			})
		})
}

const init = () => {
	fetchAllBooks()
}

init()

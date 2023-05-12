import axios from "axios";

// export const getBooks = async () => {
//   return [
//     {
//       title: "The Great Gatsby",
//       ISBN: "978-0-684-85818-1",
//       author: "F. Scott Fitzgerald",
//       releaseDate: "April 10, 1925",
//       image: "https://example.com/book1.jpg",
//       donatorcomment: "A classic American novel.",
//       donateDate: "2023-04-20",
//       genreId: 1,
//       donatorId: 123,
//       ownerId: 456,
//     },
//     {
//       title: "To Kill a Mockingbird",
//       ISBN: "978-0-446-31078-9",
//       author: "Harper Lee",
//       releaseDate: "July 11, 1960",
//       image: "https://example.com/book2.jpg",
//       donatorcomment: "An important novel addressing racial injustice.",
//       donateDate: "2023-04-22",
//       genreId: 2,
//       donatorId: 789,
//       ownerId: 123,
//     },
//     {
//       title: "1984",
//       ISBN: "978-0-451-52493-5",
//       author: "George Orwell",
//       releaseDate: "June 8, 1949",
//       image: "https://example.com/book3.jpg",
//       donatorcomment: "A dystopian masterpiece.",
//       donateDate: "2023-04-23",
//       genreId: 3,
//       donatorId: 456,
//       ownerId: 789,
//     },
//     {
//       title: "Pride and Prejudice",
//       ISBN: "978-0-14-143951-8",
//       author: "Jane Austen",
//       releaseDate: "January 28, 1813",
//       image: "https://example.com/book4.jpg",
//       donatorcomment: "A beloved classic of English literature.",
//       donateDate: "2023-04-24",
//       genreId: 4,
//       donatorId: 123,
//       ownerId: 456,
//     },
//     {
//       title: "The Catcher in the Rye",
//       ISBN: "978-0-316-76953-0",
//       author: "J.D. Salinger",
//       releaseDate: "July 16, 1951",
//       image: "https://example.com/book5.jpg",
//       donatorcomment: "A coming-of-age novel with a rebellious protagonist.",
//       donateDate: "2023-04-26",
//       genreId: 5,
//       donatorId: 789,
//       ownerId: 123,
//     },
//     {
//       title: "Moby-Dick",
//       ISBN: "978-0-14-243724-7",
//       author: "Herman Melville",
//       releaseDate: "October 18, 1851",
//       image: "https://example.com/book6.jpg",
//       donatorcomment: "A classic tale of obsession and revenge.",
//       donateDate: "2023-04-27",
//       genreId: 6,
//       donatorId: 456,
//       ownerId: 789,
//     },
//   ];
// };

export const getBooks = async () => {
  let endpoint = "http://localhost:4000/books";

  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getDonateBooks = async (userId) => {
  let endpoint = "http://localhost:4000/books/search";

  try {
    const response = await axios.post(endpoint, { donatorId: `${userId}` });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getFavouriteBooks = async (userId) => {
  let endpoint = "http://localhost:4000/favourites/search";

  try {
    const response = await axios.post(endpoint, { userId: `${userId}` });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getOrderBooks = async (userId) => {
  let endpoint = "http://localhost:4000/orders/search";

  try {
    const response = await axios.post(endpoint, { userId: `${userId}` });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

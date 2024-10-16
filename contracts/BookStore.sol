// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract BookStore {
    address public owner;
    uint256 public bookCount;

    struct Book {
        string title;
        string author;
        uint256 copies;
    }

    mapping(string => Book) private booksByTitle;

    event BookAdded(string indexed title, string author, uint256 copies);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        bookCount = 0;
    }

    // Add book function marked as external
    function addBook(string calldata _title, string calldata _author, uint256 _copies) external onlyOwner {
        require(booksByTitle[_title].copies == 0, "Book with this title already exists");

        booksByTitle[_title] = Book({
            title: _title,
            author: _author,
            copies: _copies
        });

        bookCount++;
        emit BookAdded(_title, _author, _copies);
    }

    // Get book details function marked as external
    function getBook(string calldata _title) external view returns (string memory title, string memory author, uint256 copies) {
        Book memory book = booksByTitle[_title];
        require(bytes(book.title).length > 0, "Book does not exist");
        return (book.title, book.author, book.copies);
    }
}

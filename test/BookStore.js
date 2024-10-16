const { expect } = require("chai");

describe("BookStore", function () {
  let BookStore, bookStore, owner, addr1, addr2;

  // Deploy the contract before each test
  beforeEach(async function () {
    BookStore = await ethers.getContractFactory("BookStore");
    [owner, addr1, addr2] = await ethers.getSigners();
    bookStore = await BookStore.deploy();
    await bookStore.waitForDeployment();
  });

  it("Should set the right owner", async function () {
    expect(await bookStore.owner()).to.equal(owner.address);//It ensure the owner is adding books
  });

  it("Should allow the owner to add a book", async function () {
    await bookStore.addBook("Struct", "Solidity", 10); //Adding Books
    const book = await bookStore.getBook("Struct"); //Getting the added books

    expect(book.title).to.equal("Struct");
    expect(book.author).to.equal("Solidity");
    expect(book.copies).to.equal(10);
  });

  it("Should emit an event when a book is added", async function () {
    await expect(bookStore.addBook("Blockchain", "Baze", 5)) //Ensuring event will be emitted when books are added
      .to.emit(bookStore, "BookAdded")
      .withArgs("Blockchain", "Baze", 5);
  });

  //Not allowing unauthorize address to access the book
  it("Should not allow non-owners to add books", async function () {
    await expect(
      bookStore.connect(addr1).addBook("Ethereum", "WID", 15)
    ).to.be.revertedWith("Only owner can perform this action");
  });

  //If books does not exist, it should return an erro
  it("Should fail to get a non-existent book", async function () {
    await expect(bookStore.getBook("Non Existent")).to.be.revertedWith(
      "Book does not exist"
    );
  });
});

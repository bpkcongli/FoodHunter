const NotFound = {
  async render() {
    return `
      <div class="not-found-container">
        <img src="/images/not-found.png" alt="Resource Not Found">
        <p>Ooops, it seems that the resource you accessed does not found. Go back to <a href="/#/home">Home</a></p>
      </div>
    `;
  },
};

export default NotFound;

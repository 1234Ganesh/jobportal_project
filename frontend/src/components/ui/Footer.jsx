const Footer = () => {
  return (
    <>
      <div className="container py-5">
        <h1>Welcome to My Website</h1>
        <p>This is a basic layout with a footer example.</p>
      </div>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About Us</h5>
              <p>
                We are a company dedicated to providing the best services to our
                customers.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>Email: contact@example.com</p>
              <p>Phone: +1 234 567 890</p>
            </div>
            <div className="col-md-4">
              <h5>Follow Us</h5>
              <a href="#" className="text-white me-3">
                Facebook
              </a>
              <a href="#" className="text-white me-3">
                Twitter
              </a>
              <a href="#" className="text-white">
                Instagram
              </a>
            </div>
          </div>
          <hr className="bg-white" />
          <p>&copy; 2025 My Website. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

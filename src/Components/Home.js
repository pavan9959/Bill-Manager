import homeImg from "../image/home1.svg";

const Home = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={homeImg} style={{ height: "500px" }} />
      </div>
      <div>
        <h1>Bill Manager</h1>
        <p>
          Simple and User friendly app to keep track of your customers and
          Products
        </p>
        <p>Update a new customer or Product at any given time</p>
        <div>
          <h1>Usage</h1>
          <p>Kindly login with ur registered email</p>
          <p>
            If you are not having an account then Kindly Register to us by
            clicking on REGISTER
          </p>
          <p>You can view all of your data at Dashboard </p>
          <p>
            In customer page you can add,edit or can delete a specific customer{" "}
          </p>
          <p>You can Generate bill and can download Invoice</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

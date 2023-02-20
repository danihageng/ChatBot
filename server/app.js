const cleverbot = require("cleverbot-free"),
  express = require("express"),
  app = express(),
  cors = require("cors");
const bodyParser = require('body-parser'); // Middleware
var jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let user = "";
let Passw = "";

// URL http://localhost:8000/sendMMessage
app.post("/sendMessage", async (req, res) => {
  const message = req.body.message;
  const token = req.body.token;
  if(token){
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, 'shhhhh');
    if(user == decode.user && Passw == decode.passw) {
      //  Return response with response data
      const response = await cleverbot(message);
      res.json({
        response: response,
      });
    // If the token not is verify, return token invalid 
    } else {
      // Return response with error
      res
      .status(401)
      .json({ message: "The token your provided are invalid" });
    }
  // If not send token
  }else{
    // Return response with error
    res
      .status(401)
      .json({ message: "The token your provided are invalid" });
  }
});

// URL http://localhost:8000/getWelcomeMessage
app.get("/getWelcomeMessage", (req, res) => {
  // Obtain the query params.
  const queryParams = new URLSearchParams(req.url.split('?')[1]);
  const token = queryParams.get('token');
  // If the token is present
  if(token){
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, 'shhhhh');
    if(user == decode.user && Passw == decode.passw) {
      //  Return response with response data
      const response = "Hi, welcome, this is an IA chatBot that can help you.";
      res.json({
        response: response,
      });
    // If the token not is verify, return token invalid 
    } else {
      // Return response with error
      res
      .status(401)
      .json({ message: "The token your provided are invalid" });
    }
  // If not send token
  }else{
    // Return response with error
    res
      .status(401)
      .json({ message: "The token your provided are invalid" });
  }
});

// http://localhost:8000/login
app.post("/login", (req, res) => {
  // Control if user and password is admin text.
  if (req.body.username === 'admin' && req.body.password == 'admin') {
    user = req.body.username;
    Passw = req.body.password;
    var token = jwt.sign({ user: user, passw: Passw }, 'shhhhh');
    // Return the response with the token.
    res.send(`${token}`);
  } else {
     // Return response with error.
     res
     .status(401)
     .json({ message: "Invalid credentials." });
  }
});

app.listen(8000, (req, res) => {
  console.log("running");
});

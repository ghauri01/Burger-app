
// Get Home Controller
const getHome = async (req, res) => {
  await res.render("index", { title: "Backend Burger Menu  v 0.1.0" });
};



module.exports = getHome ;

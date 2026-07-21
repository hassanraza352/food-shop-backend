const Logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true
    });

    res.status(200).json({
        message: "Logout Successfully"
    });

};

module.exports = {
    Logout
};
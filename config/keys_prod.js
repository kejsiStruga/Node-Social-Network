mongoURI=process.env.MONGO_URI,
googleClientID=process.env.GOOGLE_CLIENT_ID,
googleClientSecret=process.env.GOOGLE_CLIENT_SECRET

console.log("Debugging keys_prod, error while loging in!");
console.log(mongoURI)
console.log(googleClientID)
console.log(googleClientSecret)

module.exports = mongoURI, googleClientID, googleClientSecret
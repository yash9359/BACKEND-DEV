// hash map bana diya
const sessionIdToUserMap = new Map();


// basic getter and setter lgg raha hai

function setUser(id, user) {
    sessionIdToUserMap.set(id, user);
}

function getUser(id) {
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}
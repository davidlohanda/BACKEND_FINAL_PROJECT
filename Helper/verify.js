const verify = (username,email) => {
    return {
        from : 'davidlohanda8@gmail.com',
        to : email,
        subject : 'User Verification',
        html : `<h2>Hi, ${username}!</h2>
                <h3>Thankyou for registration</h3>
                <p>Please verify your account before login by clicking the link below :</p>
                <a href='http://localhost:2000/auth/userVerification?username=${username}'>http://localhost:2000/userVerification?username=${username}</a>
                `
    }
}

module.exports = verify

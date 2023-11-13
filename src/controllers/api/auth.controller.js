const {Pracownik, PracownikSchema} = require('../../models/Pracownik.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
    LOGIN: async (req, res, next) => {
        const { username, password} = req.body;
        Pracownik.findOne({
            login: username
          }).then(user => {
            if (!user) {
                res.status(400);
                return res.json({ message: "Nieprawidłowy login!"});
            }
    
            // Match password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                const token = jwt.sign(
                    { 
                        id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "12h",
                    }
                  );
                res.status(200);
                return res.json({ message: "Zalogowano!", token});
              } else {
                res.status(400);
                return res.json({ message: "Nieprawidłowe hasło!"});
              }
            });
          });
    },
    REGISTER: async (req, res, next) => {
        console.log(req.body);
        const { username, password} = req.body;
        let errors = [];

        if (!username || !password ) {
            errors.push('Uzupełnij wszystkie pola!');
        }

        if (password.length < 8) {
            errors.push('Hasło musi składać się z przynajmniej 8 znaków');
        }

        if(errors.length > 0){
            res.status(400);
            return res.json({ message: errors.join(';')});
        }

        Pracownik.findOne({ login: username }).then(user => {
            if (user) {
                errors.push('Użytkownik o takim loginie już istnieje');
                res.status(400);
                return res.json({ message: errors.join(';')});
                //return res.render('users/addUser', { user: req.user, errors, newUser: req.body});
            }
            const newUser = new Pracownik({fName: "-", lName: "-", address: ""-"", role: "Manager", login: username, password, email: "-"});
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.password = hash;

                    newUser.save().then(user => {
                        const token = jwt.sign(
                            { 
                                id: user._id,
                                email: user.email,
                                role: user.role,
                            },
                            process.env.JWT_SECRET,
                            {
                              expiresIn: "12h",
                            }
                          );
                        res.status(200);
                        return res.json({ message: "Logged in successfully", token });
                    }).catch(err => {
                        console.log(err);
                        res.status(400);
                        return res.json({ message: "Wystąpił błąd podczas rejestracji"});
                    });
                });
            });
        });
    },
    
}
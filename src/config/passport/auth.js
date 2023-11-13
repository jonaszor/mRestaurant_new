module.exports = {
    /**
     * Ensure user have 'Admin' role
     * @description Sprawdza czy użytkownik posiada uprawnienia Admina, jeśli nie zostaje odesłany na wskazaną ścieżkę
     */
    ensureIsAdmin:  (req, res, next) => {
        if (req.user.role == 'Admin') {
            res.status(200);
            return next();
        }
        
        res.status(400);
        return res.json({ message: "Wymagana rola tego zasobu to Admin!"});
    },
    /**
     * Ensure user have 'Admin' or 'Kierownik restauracji' role
     * @description Sprawdza czy użytkownik posiada uprawnienia Admina lub Kierownika Restauracji, jeśli nie zostaje odesłany na wskazaną ścieżkę
     */
    ensureIsKR:  (req, res, next) => {
        if (req.user.role == 'Kierownik Restauracji') {
            res.status(200);
            return next();
        }
        
        res.status(400);
        return res.json({ message: "Wymagana rola tego zasobu to Kierownik Restauracji!"});
    },
  };
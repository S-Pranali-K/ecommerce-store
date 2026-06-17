const adminOnly = (
    req,
    res,
    next
) => {

    console.log(
        'USER ROLE:',
        req.user.role
    );

    if (
        req.user.role !== 'admin'
    ) {

        return res.status(403).json({
            message:
                'Admin Access Only'
        });

    }

    next();

};

module.exports = adminOnly;
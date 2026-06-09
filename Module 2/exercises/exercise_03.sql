USE event_management;

SELECT user_id, full_name, email, city, registration_date
FROM Users
WHERE user_id NOT IN (
    SELECT DISTINCT user_id
    FROM Registrations
    WHERE registration_date >= CURDATE() - INTERVAL 90 DAY
)
ORDER BY full_name ASC;

USE event_management;

SELECT user_id, full_name, email, city, registration_date
FROM Users
WHERE registration_date >= CURDATE() - INTERVAL 30 DAY
  AND user_id NOT IN (
      SELECT DISTINCT user_id FROM Registrations
  )
ORDER BY registration_date DESC;

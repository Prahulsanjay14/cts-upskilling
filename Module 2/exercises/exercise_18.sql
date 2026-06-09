USE event_management;

SELECT e.event_id, e.title, e.status, e.city, e.start_date
FROM Events e
LEFT JOIN Resources r ON e.event_id = r.event_id
WHERE r.resource_id IS NULL
ORDER BY e.start_date ASC;

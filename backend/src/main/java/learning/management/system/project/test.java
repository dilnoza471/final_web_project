package learning.management.system.project;

import java.sql.*;

public class test {

    private static final String JDBC_URL = "jdbc:postgresql://aws-0-ap-south-1.pooler.supabase.com:6543/postgres"; // Change to your DB URL
    private static final String USER = "postgres"; // Database username
    private static final String PASSWORD = "WnRhjc*wL-3#@VD"; // Database password

    public static void main(String[] args) {
        // Connection object
        Connection connection = null;

        try {
            // Establish connection to the database
            connection = DriverManager.getConnection(JDBC_URL, USER, PASSWORD);

            // SQL query to fetch course by ID
            String sql = "SELECT * FROM courses WHERE id = ?"; // Change this query based on your DB structure

            // Prepare statement
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            preparedStatement.setLong(1, 101); // Example course ID (replace with the one you want to fetch)

            // Execute the query and get result
            ResultSet resultSet = preparedStatement.executeQuery();

            // Check if the course is found
            if (resultSet.next()) {
                // Extract data from result set
                long id = resultSet.getLong("id");
                String code = resultSet.getString("code");
                String title = resultSet.getString("title");
                String instructor = resultSet.getString("instructor");
                int credits = resultSet.getInt("credits");
                String location = resultSet.getString("location");
                String department = resultSet.getString("department");
                String color = resultSet.getString("color");
                int availableSeats = resultSet.getInt("available_seats");

                // Print course details
                System.out.println("Course ID: " + id);
                System.out.println("Course Code: " + code);
                System.out.println("Course Title: " + title);
                System.out.println("Instructor: " + instructor);
                System.out.println("Credits: " + credits);
                System.out.println("Location: " + location);
                System.out.println("Department: " + department);
                System.out.println("Color: " + color);
                System.out.println("Available Seats: " + availableSeats);
            } else {
                System.out.println("Course not found with ID: 101");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                // Close connection and statement
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}

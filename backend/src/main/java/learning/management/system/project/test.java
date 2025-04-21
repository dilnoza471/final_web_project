package learning.management.system.project;

import
        java.sql.Connection;
import
        java.sql.DriverManager;
public

class test { public static void

    main
            (
                    String
                            [] args
            )
    {

        String
                url =
                "jdbc:postgresql://db.prjbyhwkoofbcjolxunk.supabase.co:5432/postgres"
                ;

        String
                user =
                "postgres"
                ;
// Replace with your Supabase username


        String
                password =
                "WnRhjc*wL-3#@VD"
                ;
// Replace with your Supabase password


        try
                (Connection conn = DriverManager.getConnection(url, user, password)) {
            System.out.println(
                    "Connection successful!"
            );
        }
        catch
        (Exception e) {
            e.printStackTrace();
        }
    }
}
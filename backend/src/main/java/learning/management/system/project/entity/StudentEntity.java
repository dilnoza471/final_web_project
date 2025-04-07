package learning.management.system.project.entity;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "student")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "sid",length = 40)
    private int sid;

    @Column(name = "name",length = 50,nullable = false)
    private String name;

    @Column(name = "address",length = 200,nullable = false)
    private String address;

    @Column(name="tel",length = 15,nullable = false)
    private String tel;

    @Column(name = "nic",length = 15,nullable = false)
    private String nic;
}

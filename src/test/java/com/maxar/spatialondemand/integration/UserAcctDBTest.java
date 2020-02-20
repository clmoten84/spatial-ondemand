package com.maxar.spatialondemand.integration;

import com.maxar.spatialondemand.SpatialondemandWebApplication;
import com.maxar.spatialondemand.dto.RoleDTO;
import com.maxar.spatialondemand.dto.UserAcctDTO;
import com.maxar.spatialondemand.service.UserAcctService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

/**
 * UserAcctDBTest
 *
 * Integration test for CRUDing UserAcct and Role domain models to the database.
 *
 * NOTE:
 * This integration test uses an in-memory instance of Postgres running in a docker container
 * constructed by the TestContainers library. The in-memory test DB instance is initialized by
 * the TestContainers library using the tc_application.properties file. Once the DB environment
 * is initialized, Flyway runs all the DB migration scripts against the test DB instance, which
 * updates the test DB instance schema to the most up-to-date schema shared by our live database
 * instances. Once all this is done, integration tests can be executed against the test DB instance.
 *
 * WARN:
 * If TestContainers fails to initialize the database environment, you may need to locally install
 * Docker on the machine where the test suites are being executed, as Docker is a dependency of
 * the TestContainers library.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {SpatialondemandWebApplication.class})
@ActiveProfiles("test")
@TestPropertySource(locations = "/tc_application.properties")
@Sql(scripts = {"/sql/UserAcctDBTest.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class UserAcctDBTest {

    @Autowired
    UserAcctService userAcctService;

    @Test
    public void saveUserAcctTest() {
        // Create a test user
        UserAcctDTO userAcctDTO = new UserAcctDTO();
        userAcctDTO.setUsername("cmoten");
        userAcctDTO.setPassword("lamont84");
        userAcctDTO.setEmail("corey.moten@maxar.com");
        userAcctDTO.setName("Corey Moten");
        userAcctDTO.setBizEntity("Maxar Technologies");
        userAcctDTO.setAdmin(true);

        // Define role for user
        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setRoleName("ADMIN");

        userAcctDTO.getRoles().add(roleDTO);

        UserAcctDTO savedUser = userAcctService.save(userAcctDTO);
        Assert.assertNotNull(savedUser);
        Assert.assertNotNull(savedUser.getId());
        Assert.assertEquals("cmoten", savedUser.getUsername());
        Assert.assertNotEquals("lamont84", savedUser.getPassword());
    }

    @Test
    public void deleteUserAcctTest() {
        // Create and persist a test UserAcct
        UserAcctDTO userAcctDTO = new UserAcctDTO();
        userAcctDTO.setUsername("cmoten");
        userAcctDTO.setPassword("lamont84");
        userAcctDTO.setEmail("corey.moten@maxar.com");
        userAcctDTO.setName("Corey Moten");
        userAcctDTO.setBizEntity("Maxar Technologies");
        userAcctDTO.setAdmin(true);

        RoleDTO roleDTO = new RoleDTO();
        roleDTO.setRoleName("ADMIN");
        userAcctDTO.getRoles().add(roleDTO);
        UserAcctDTO savedUser = userAcctService.save(userAcctDTO);

        // Verify count of users is 1
        long userCnt = userAcctService.count();
        Assert.assertEquals(1, userCnt);

        // Delete test UserAcct and verify count of users is 0
        userAcctService.deleteUserAcctById(savedUser.getId());
        userCnt = userAcctService.count();
        Assert.assertEquals(0, userCnt);
    }

    @Test
    public void findByUsernameTest() {
        UserAcctDTO fetchedUser = userAcctService.findByUsername("kbryant");
        Assert.assertNotNull(fetchedUser);
        Assert.assertEquals("kbryant", fetchedUser.getUsername());
        Assert.assertTrue(fetchedUser.getRoles().size() == 1);

        RoleDTO userRole = fetchedUser.getRoles().get(0);
        Assert.assertNotNull(userRole);
        Assert.assertNotNull(userRole.getId());
        Assert.assertEquals("ADMIN", userRole.getRoleName());
    }

    @Test
    public void findByEmailTest() {
        UserAcctDTO fetchedUser = userAcctService.findByEmail("sumdumgoy@gmail.com");
        Assert.assertNotNull(fetchedUser);
        Assert.assertEquals("sumdumgoy", fetchedUser.getUsername());
        Assert.assertTrue(fetchedUser.getRoles().size() == 1);

        RoleDTO userRole = fetchedUser.getRoles().get(0);
        Assert.assertNotNull(userRole);
        Assert.assertNotNull(userRole.getId());
        Assert.assertEquals("USER", userRole.getRoleName());
    }

    @Test
    public void findUserAcctsByRoleTest() {
        List<UserAcctDTO> users = userAcctService.findUserAcctsByRole("ADMIN");
        Assert.assertNotNull(users);
        Assert.assertTrue(users.size() > 0);

        UserAcctDTO adminUser = users.get(0);
        Assert.assertNotNull(adminUser);
        Assert.assertEquals("kbryant", adminUser.getUsername());
    }
}

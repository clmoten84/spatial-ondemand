package com.maxar.spatialondemand.integration;

import com.maxar.spatialondemand.SpatialondemandWebApplication;
import com.maxar.spatialondemand.dto.ProductDTO;
import com.maxar.spatialondemand.dto.ProjectDTO;
import com.maxar.spatialondemand.service.ProjectService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * ProjectDBTest
 *
 * Integration test for CRUDing Project domain models to the database.
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
@Sql(scripts = {"/sql/ProjectDBTest.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class ProjectDBTest {

    @Autowired
    ProjectService projectService;

    @Test
    public void saveProjectTest() {
        // Create a test Project
        ProjectDTO testProject = new ProjectDTO();
        testProject.setProjectTitle("Project X");
        testProject.setProjectDescription("Kobe Bryant 5x NBA champion!");
        testProject.setDateCreated(new Timestamp(new Date().getTime()));
        testProject.setLastModified(new Timestamp(new Date().getTime()));
        testProject.setFilterAcquisitionRangeFrom(java.sql.Date.valueOf("2015-02-14"));
        testProject.setFilterAcquisitionRangeTo(java.sql.Date.valueOf("2019-12-31"));
        testProject.setFilterResolutionFrom((short) 25);
        testProject.setFilterResolutionTo((short) 50);
        testProject.setFilterIncidenceAngleFrom((short) 15);
        testProject.setFilterIncidenceAngleTo((short) 75);
        testProject.setFilterCloudCoverFrom((short) 0);
        testProject.setFilterCloudCoverTo((short) 100);
        testProject.setFilterSnowCoverFrom((short) 10);
        testProject.setFilterSnowCoverTo((short) 50);

        // Create test Products to include with Project
        ProductDTO productDTO_1 = new ProductDTO();
        productDTO_1.setProductId(400);

        ProductDTO productDTO_2= new ProductDTO();
        productDTO_2.setProductId(401);

        Set<ProductDTO> products = new HashSet<>();
        products.add(productDTO_1);
        products.add(productDTO_2);
        testProject.setProducts(products);

        ProjectDTO savedProject = projectService.save(testProject);
        Assert.assertNotNull(savedProject);
        Assert.assertNotNull(savedProject.getId());
        Assert.assertEquals(2, savedProject.getProducts().size());
    }

    @Test
    public void updateProjectTest() {
        ProjectDTO projectToUpdate = new ProjectDTO();
        projectToUpdate.setProjectTitle("A Mosaic Export Project");
        projectToUpdate.setProjectDescription("This is a test project for testing project update functionality.");

        ProjectDTO updatedProject = projectService.update(1, projectToUpdate);
        Assert.assertNotNull(updatedProject);
        Assert.assertEquals(1, updatedProject.getId().intValue());
        Assert.assertEquals("A Mosaic Export Project", updatedProject.getProjectTitle());

        // Set of associated products for this project should be null because they
        // are lazily loaded from the database.
        Assert.assertNull(updatedProject.getProducts());
    }

    @Test(expected = EntityNotFoundException.class)
    public void updateProject_WhenEntityNotFoundTest() {
        ProjectDTO update = new ProjectDTO();
        update.setProjectTitle("An Update");
        update.setProjectDescription("An updated project DTO.");

        // This should throw an exception as there is no project with an id of 5
        projectService.update(5, update);
    }

    @Test
    public void countTest() {
        long projectCount = projectService.getProjectCount();
        Assert.assertEquals(2, projectCount);
    }

    @Test
    public void deleteProjectTest() {
        projectService.delete(1);
        long projectCount = projectService.getProjectCount();

        Assert.assertEquals(1, projectCount);
    }

    @Test(expected = EmptyResultDataAccessException.class)
    public void deleteProject_WhenEntityNotFoundTest() {
        // This should throw an exception
        projectService.delete(112);
    }

    @Test
    public void findProjectByIdTest() {
        ProjectDTO project = projectService.findProjectById(2);
        Assert.assertNotNull(project);
        Assert.assertEquals("Another Imagery Project", project.getProjectTitle());
    }

    @Test
    public void fetchAllProjectsTest() {
        List<ProjectDTO> projects = projectService.fetchAllProjects();
        Assert.assertNotNull(projects);
        Assert.assertTrue(projects.size() > 0);
    }
}

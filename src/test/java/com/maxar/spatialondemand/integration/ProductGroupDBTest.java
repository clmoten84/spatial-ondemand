package com.maxar.spatialondemand.integration;

import com.maxar.spatialondemand.SpatialondemandWebApplication;
import com.maxar.spatialondemand.dto.ProductGroupDTO;
import com.maxar.spatialondemand.service.ProductGroupService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * ProductGroupDBTest
 *
 * Integration test for CRUDing ProductGroup domain models to the database.
 *
 * NOTE:
 * This integration test uses an in-memory instance of Postgres running in a docker container
 * constructed by the TestContainers library. The in-memory test DB instance is initialized by
 * the TestContainers library using the tc_application.properties file. Once the DB environment
 * is initialized, Flyway runs all DB migration scripts against the test DB instance, which
 * updates the test DB instance schema to the most up-to-date schema shared by our live database
 * instances. Once all this is done, integration tests can be executed against the test DB instance.
 *
 * WARN:
 * If TestContainers fails to initialize the database environment, you may need to locally install
 * Docker on the machine where the test suites are being executed as Docker is a dependency of
 * TestContainers.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {SpatialondemandWebApplication.class})
@ActiveProfiles("test")
@TestPropertySource(locations = "/tc_application.properties")
@Sql(scripts = {"/sql/ProductGroupDBTest.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class ProductGroupDBTest {
    @Autowired
    ProductGroupService productGroupService;

    @Test
    public void testFindProductGroupByName() {
        ProductGroupDTO productGroupDTO = productGroupService.findByGroupName("Test Group");
        Assert.assertNotNull(productGroupDTO);
    }

    @Test
    public void testSaveProductGroup() {
        ProductGroupDTO productGroupDTO = new ProductGroupDTO();
        productGroupDTO.setGroupName("Just One More Test Group");

        ProductGroupDTO savedProductGroup = productGroupService.save(productGroupDTO);
        Assert.assertNotNull(savedProductGroup);
        Assert.assertNotNull(savedProductGroup.getGroupId());
    }
}

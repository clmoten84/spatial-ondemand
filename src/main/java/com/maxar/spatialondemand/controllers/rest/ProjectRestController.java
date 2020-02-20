package com.maxar.spatialondemand.controllers.rest;

import com.maxar.spatialondemand.dto.ProjectDTO;
import com.maxar.spatialondemand.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ProjectRestController
 *
 * Controller for REST API for Project related business logic
 */
@RestController
@RequestMapping(value = "/api")
public class ProjectRestController {

    private ProjectService projectService;

    @Autowired
    public ProjectRestController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Saves a new Project record
     * @param projectDTOIn
     * @return
     */
    @PostMapping(value = "/projects",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProjectDTO saveProject(@RequestBody ProjectDTO projectDTOIn) {
        return projectService.save(projectDTOIn);
    }

    /**
     * Updates an existing Project record
     * @param projectId
     * @param projectDTOIn
     * @return
     */
    @PutMapping(value = "/projects/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ProjectDTO updateProject(@PathVariable("id") Integer projectId, @RequestBody ProjectDTO projectDTOIn) {
        return projectService.update(projectId, projectDTOIn);
    }

    /**
     * Deletes an existing Project record
     * @param projectId
     */
    @DeleteMapping(value = "/projects/{id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public void deleteProject(@PathVariable("id") Integer projectId) {
        projectService.delete(projectId);
    }

    /**
     * Fetch ALL Project records
     * @return
     */
    @GetMapping(value = "/projects",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_FORM_URLENCODED_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<ProjectDTO> fetchAllProjects() {
        return projectService.fetchAllProjects();
    }
}

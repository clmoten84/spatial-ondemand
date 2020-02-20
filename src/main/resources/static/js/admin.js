/*
 * admin.js
 * SOD Application Admin
 */

require(['app/widgets/layout/view/AdminLayout',
         'app/widgets/admin/roles/viewController/RolesManagerViewController',
         'app/widgets/admin/users/viewController/UserManagerViewController'],
            function(AdminLayout, RolesManagerViewController, UserManagerViewController){
    // Render admin layout
    AdminLayout.renderAdminLayout();

    // Populate admin grids
    RolesManagerViewController.fetchAllRoles();
    UserManagerViewController.fetchAllUsers();
});
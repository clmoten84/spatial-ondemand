/*
 * UserProfile.js
 *
 * Defines UI components for user profile widget/view
 */

define(['dijit/form/DropDownButton',
        'dijit/DropDownMenu',
        'dijit/MenuItem',
        'app/widgets/userProfile/viewController/UserProfileViewController'],
            function(DropDownButton, DropDownMenu, MenuItem, UserProfileViewController) {

    return {
        renderUserProfileMenu: function() {
            let userProfileMenu = new DropDownMenu({
                id: 'user-profile-menu',
                class: 'appMenu'
            });

            userProfileMenu.addChild(new MenuItem({
                label: 'Profile',
                class: 'appMenuItem',
                onClick: function() {
                    console.log('Make this show user profile view!');
                }
            }));

            userProfileMenu.addChild(new MenuItem({
                label: 'Admin',
                class: 'appMenuItem',
                onClick: UserProfileViewController.goToAdmin
            }));

            userProfileMenu.addChild(new MenuItem({
                label: '<u style="color:blue;">Sign Out</u>',
                class: 'appMenuItem',
                onClick: UserProfileViewController.signOut
            }));

            return new DropDownButton({
                id: 'user-profile-btn',
                class: 'user-profile-btn',
                showLabel: false,
                iconClass: 'dijitIconUsers',
                dropDown: userProfileMenu,
                onMouseEnter: function() {
                    this.set('title', 'Hello, ' + SpatialOndemand.currUserDetails.username);
                }
            });
        }
    }
});
<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
             <a class="sidebar-brand d-flex flex-column align-items-center justify-content-center my-3" href="<?php echo base_url()?>dashboard">
                <div class="sidebar-brand-icon">
                    <i class="fas fa-fw fa-user-tie"></i>
                    <div class="sidebar-brand-text mx-3">SWCMS:<?php echo $name;?></div>
                </div>
                
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <?php if($level == 'admin' || $level == 'superadmin') {?>
                <!-- Nav Item - Dashboard -->
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>dashboard">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span></a>
                </li>

                <!-- Divider -->
                <!-- <hr class="sidebar-divider"> -->

                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>wastecat">
                        <i class="fas fa-trash-alt"></i>
                        <span>Waste Category</span></a>
                </li>

                <!-- <hr class="sidebar-divider"> -->

                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>usersection">
                        <i class="fas fa-building"></i>
                        <span>User's Section</span></a>
                </li>

                <!-- Nav Item - Report Collapse Menu -->
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-fw fa-file-pdf"></i>
                        <span>Reports Section</span>
                    </a>
                    <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class="collapse-item" href="<?php echo base_url()?>wastecat/laporan">Waste Category</a>
                            <a class="collapse-item" href="<?php echo base_url()?>municipal/laporan">Municipality/LGU</a>
                        </div>
                    </div>
                </li>

                <?php if ($level == "superadmin") {?>
                <li class="nav-item">
                    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseSettings"
                        aria-expanded="true" aria-controls="collapseUtilities">
                        <i class="fas fa-fw fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <div id="collapseSettings" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class="collapse-item" href="<?php echo base_url()?>settings/admin">Administrator's</a>
                            <a class="collapse-item" href="<?php echo base_url()?>settings/activityLog">Activity Logs</a>
                        </div>
                    </div>
                </li>
                <?php } ?>
            <?php } else if($level == 'user') { ?>

                <!-- Nav Item - Dashboard -->
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>personalInfo">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Personal Info</span></a>
                </li>

                <!-- Divider -->
                <!-- <hr class="sidebar-divider"> -->

                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>businessInfo">
                        <i class="fas fa-trash-alt"></i>
                        <span>Business Info</span></a>
                </li>

                <!-- <hr class="sidebar-divider"> -->

                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>wasteInfo">
                        <i class="fas fa-building"></i>
                        <span>Waste Info</span></a>
                </li>

                <!-- <hr class="sidebar-divider"> -->

                <li class="nav-item">
                    <a class="nav-link" href="<?php echo base_url()?>concerns">
                        <i class="fas fa-building"></i>
                        <span>Concerns</span></a>
                </li>

            <?php }?>
            <!-- Divider -->
            <!-- <hr class="sidebar-divider"> -->

            <!-- Nav Item - Data Mahasiswa -->
            <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i class="fas fa-power-off icon-nav"></i>
                    <span>Logout</span>
                </a>
            </li>

            <!-- Divider -->
            <!-- <hr class="sidebar-divider d-none d-md-block"> -->

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Sidebar Toggle (Topbar) -->
                    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                        <i class="fa fa-bars"></i>
                    </button>

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav mr-auto">

                        <!-- Web Page Logo -->
                        <li class="nav-item">
                            <a class="nav-link" href="<?php echo base_url().'dashboard' ?>">
                                <img class="logo"
                                    src="<?php echo base_url().'assets/img/seal.jpg' ?>">
                            </a>
                        </li>

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Web Page Title -->
                        <li class="nav-item mx-1">
                            <a class="nav-link" href="#">
                                <div class="text-lg text-dark font-weight-bold">Solid Waste Collection Management System</div>
                            </a>
                        </li>

                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Logout Modal-->
                <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="logoutModal"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title font-weight-bold text-primary mx-3 mt-3" id="logoutModalLabel">Are you sure you're going out?</h5>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div class="modal-body mx-3 mb-4">Select the "Logout" button below if you are ready to end this session.</div>
                            <div class="modal-footer d-flex m-3">
                                <button class="flex-fill btn btn-secondary p-2 rounded-pill" type="button" data-dismiss="modal">Cancel</button>
                                <a class="flex-fill btn btn-danger p-2 rounded-pill" href="<?php echo base_url().'welcome/logout'?>">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>

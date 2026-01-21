<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardRoleManagementController extends Controller
{
    public function index(){
        return inertia('Dashboard/RoleManagement/Index');
    }
}

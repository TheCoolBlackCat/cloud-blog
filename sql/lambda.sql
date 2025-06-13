--------------------------------------------
-- Script to setup database/users for RDS --
--------------------------------------------

CREATE DATABASE production;

-- Grant everything to admin
GRANT ALL PRIVILEGES ON DATABASE production TO adaadmin; 

-- Create & grant selection privileges to the user
CREATE USER adauser WITH PASSWORD '<password here>';
GRANT SELECT ON public.posts TO adauser;
GRANT SELECT ON public.users TO adauser;

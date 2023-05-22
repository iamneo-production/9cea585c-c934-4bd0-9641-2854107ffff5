import React from 'react';
import { Container,NavLink} from 'react-bootstrap';
import { Link} from 'react-router-dom';

function Navfooter() {
return (
<div>
    <Container>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" id='ul-nb'>
            <li class="nav-item">
                <NavLink className="remul" as={Link} to={"/Home"}>Home
                </NavLink>
            </li>
            <li class="nav-item">
                <NavLink className="remul" as={Link} to={"/About"}>About Us</NavLink>
            </li>
            <li class="nav-item">
                <NavLink className="remul" as={Link} to={"/Contact"}>Contact Us</NavLink>
            </li>
        </ul>
    </Container>
</div>
);
}

export default Navfooter;
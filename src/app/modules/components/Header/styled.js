import styled from "styled-components";

export const Container = styled.div`

.header_area {
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    .main_menu {
        background: #ffffff;

        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;

            .navbar-brand-username {
                width: 80%;
            }

            .username p {
                font-weight: 400;
            }
        }
    }
}
`;
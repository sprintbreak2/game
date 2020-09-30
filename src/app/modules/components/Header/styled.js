import styled from "styled-components";

export const Container = styled.div`

.header_area {
    color: #262533;
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 99;

    .main_menu {

        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;

            .navbar-brand-username {
                width: 80%;
            }

            .username {
                width: 100%;

                p {
                    font-family: 'Barlow Semi Condensed';
                    font-size: 18px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    text-align: center;
                    margin-bottom: 0;
                }
            }
        }
    }
}
`;
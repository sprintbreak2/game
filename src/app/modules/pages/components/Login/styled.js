import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5rem;

    .wrapper {
        
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 auto;
        width: 100%;

        h4 {
            color: #262533;
        }
        
        div.logo {
            img { 
                display: block;
                margin: auto;
            }
        }

        .github-button {
            margin: 0;
            padding: 0;
            width: 100%;
            border: none;
            background: transparent;
        }

        div.new-user {
            margin: 0 auto;
        }

        .form {
            margin: 2rem;
            width: 30%;

            h4 {
                color: #262533;
                margin: 1rem;
                text-align: center;
            }

            .input-group {
                display: flex;
                flex-direction: column;
                align-items: center;

                .MuiFormControl-root.MuiTextField-root {
                    width: 100%;
                    margin: 0.5rem;
                }

                div.button {
                    margin-top: 1rem;
                }

            }
        }

        .notlogged-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            margin-top: 5rem;
            margin-bottom: 3rem;

            img, h4 {
                margin: 1rem 0;
            }
        }
    }
`;

export const LoginsContainer = styled.div`
    border-bottom: 0.5px solid #BBBBBB;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 2rem;

    h4 {
        margin: 1rem;
    }
`;
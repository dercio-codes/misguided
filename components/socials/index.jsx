import { Box } from "@mui/material"
import Link from "next/link"
import { useState, useEffect } from "react"
import { artistData } from "../../artist-data"
export const Socials = ({ artist }) => {
    const [item, setItem] = useState( {
        spotify : 'https://open.spotify.com/artist/5JuA3291INTaMk0R8xMkZK',
        apple : 'https://music.apple.com/za/artist/dj-shadzo/1521951814' ,
        instagram : 'https://www.instagram.com/its.dj_shadzo/?hl=en',
        facebook : '' ,
        tiktok:'https://www.tiktok.com/@dj_shadzo_sa'
    })

    useEffect(() => {
        if (artist.name === "Dj Shadzo") {
            setItem(artistData[0])
        } else if (artist.name === "YKM THEE MC") {
            setItem(artistData[1])
        } else if (artist.name === "Karlo Dj") {
            setItem(artistData[2])
        }
    }, [artist])

    return (

        <Box sx={{ width: '40%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
            {item.spotify === "" ? ("") : (
                <Link href={item.spotify}>
                    <a target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DB954" className="bi bi-spotify" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                        </svg>
                    </a>
                </Link>
            )}

            {item.apple === "" ? ("") : (
                <Link href={item.apple}>
                    <a target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#eee" className="bi bi-apple" viewBox="0 0 16 16">
                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
                        </svg>
                    </a>
                </Link>
            )}

            {
                item.instagram === "" ? ("") : (
                    <Link href={item.instagram}>
                        <a target="_blank">
                            <img id="instagram-icon" src="https://img.icons8.com/fluency/48/000000/instagram-new.png" />
                        </a>
                    </Link>
                )
            }

            {
                item.facebook === "" ? ("") : (
                    <Link href={item.facebook}>
                        <a target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4267B2" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>
                        </a>
                    </Link>
                )
            }

            {
                item.tiktok === "" ? ("") : (
                    <Link href={item.tiktok}>
                        <a target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)" className="bi bi-tiktok" viewBox="0 0 16 16">
                                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                            </svg>
                        </a>
                    </Link>
                )
            }
        </Box>
    )

}
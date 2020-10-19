export default {
    path: '/film/:filmId?/cinemas',
    name: "cinemas",
    component: () => import('@/views/Cinema/Cinemas')
}
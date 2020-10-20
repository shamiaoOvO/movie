export default {
    path: '/cinema/:cinemaId?/film/:filmId?/:date?',

    component: () => import('@/views/Cinema/Movietime')

}
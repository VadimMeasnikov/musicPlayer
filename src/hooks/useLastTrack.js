export function useLastTrack ({track}){
    console.log(track);
    localStorage.setItem('track', JSON.stringify(track));
}
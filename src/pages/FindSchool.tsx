import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { titleOneSchools } from '@/data/titleOneSchools';
import { Compass, Search } from 'lucide-react';

const FindSchool = () => {
  const center: [number, number] = [35.7796, -78.6382]; // Raleigh, NC center
  const [isClient, setIsClient] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [zoom, setZoom] = useState(10);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'requesting' | 'denied' | 'error' | 'granted'>('idle');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationStatus('error');
      setLocationMessage("Your browser doesn't support location services.");
      return;
    }

    setLocationStatus('requesting');
    setLocationMessage('Locating nearby schools...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextCenter: [number, number] = [position.coords.latitude, position.coords.longitude];
        setUserLocation(nextCenter);
        setMapCenter(nextCenter);
        setZoom((prev) => (prev < 12 ? 12 : prev));
        setLocationStatus('granted');
        setLocationMessage('Showing schools near you.');
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationStatus('denied');
          setLocationMessage('Location permission denied. You can still browse schools manually.');
        } else {
          setLocationStatus('error');
          setLocationMessage('We could not determine your location. Please try again.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, []);

  useEffect(() => {
    if (isClient) {
      requestLocation();
    }
  }, [isClient, requestLocation]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Find a School</h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Find a School
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Explore Title I schools in Wake County, NC that need your support
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
          <p className="text-sm text-foreground/70">
            Share your location to quickly explore the Title I schools nearest to you.
          </p>
          <Button
            variant="outline"
            className="w-full md:w-auto"
            onClick={requestLocation}
            disabled={locationStatus === 'requesting'}
          >
            <Compass className="h-4 w-4 mr-2" />
            {locationStatus === 'requesting' ? 'Locating…' : 'Use my location'}
          </Button>
        </div>

        {locationMessage && (
          <div
            className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
              locationStatus === 'denied' || locationStatus === 'error'
                ? 'border-destructive/40 bg-destructive/10 text-destructive'
                : 'border-primary/30 bg-primary/5 text-primary'
            }`}
          >
            {locationMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <Map
            center={mapCenter}
            defaultCenter={center}
            zoom={zoom}
            defaultZoom={10}
            height={600}
            metaWheelZoom
            animate
            onBoundsChanged={({ center: nextCenter, zoom: nextZoom }) => {
              setMapCenter(nextCenter as [number, number]);
              setZoom(nextZoom);
            }}
          >
            {titleOneSchools.map((school, index) => (
              <Marker
                key={index}
                width={36}
                anchor={[school.coordinates[1], school.coordinates[0]]}
                onClick={() => setSelected(index)}
              />
            ))}

            {userLocation && (
              <>
                <Marker anchor={userLocation} width={44} color="#2563eb" />
                <Overlay anchor={userLocation} offset={[0, 35]}>
                  <div className="rounded-md bg-primary text-primary-foreground px-3 py-1 text-xs shadow-md">
                    You are here
                  </div>
                </Overlay>
              </>
            )}

            {selected !== null && (
              <Overlay
                anchor={[titleOneSchools[selected].coordinates[1], titleOneSchools[selected].coordinates[0]]}
                offset={[0, 30]}
              >
                <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur rounded-md shadow-lg p-3 text-xs sm:text-sm text-foreground max-w-[280px]">
                  <div className="font-semibold mb-1">{titleOneSchools[selected].name}</div>
                  <div className="capitalize text-foreground/70 mb-2">{titleOneSchools[selected].type} school</div>
                  <div className="text-foreground/60 text-xs">{titleOneSchools[selected].address}</div>
                </div>
              </Overlay>
            )}

            <ZoomControl />
          </Map>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <h3 className="font-semibold text-foreground">Elementary Schools</h3>
            </div>
            <p className="text-foreground/70">
              {titleOneSchools.filter((s) => s.type === 'elementary').length} schools
            </p>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <h3 className="font-semibold text-foreground">Middle Schools</h3>
            </div>
            <p className="text-foreground/70">
              {titleOneSchools.filter((s) => s.type === 'middle').length} schools
            </p>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <h3 className="font-semibold text-foreground">High Schools</h3>
            </div>
            <p className="text-foreground/70">
              {titleOneSchools.filter((s) => s.type === 'high').length} schools
            </p>
          </Card>
        </div>

        {/* Search CTA */}
        <Card className="mt-12 border border-primary/20 shadow-2xl shadow-primary/20 bg-white/95 backdrop-blur">
          <CardContent className="p-6 md:p-8 space-y-4">
            <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                placeholder="Search topics, teachers & schools"
                className="md:col-span-2 h-12 text-base border border-primary/30 shadow-sm"
              />
              <Input placeholder="city, state, or zip" className="h-12 text-base border border-primary/30 shadow-sm" />
              <Button type="submit" className="md:col-span-3 h-12 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindSchool;

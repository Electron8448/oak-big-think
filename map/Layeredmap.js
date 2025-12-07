fetch("https://ukpowernetworks.opendatasoft.com/api/records/1.0/search/?dataset=ukpn-live-faults&rows=100")
  .then(r => r.json())
  .then(data => {
    data.records.forEach(rec => {
      if (!rec.fields.geopoint) return;
      const [lat, lon] = rec.fields.geopoint;

      L.marker([lat, lon])
        .addTo(map)
        .bindPopup(`
          <strong>${rec.fields.incidentreference || "Fault"}</strong><br>
          Reason: ${rec.fields.plannedincidentreason}<br>
          Affected Postcode: ${rec.fields.postcodesaffected}<br>
          Type: ${rec.fields.powercuttype}
        `);
    });
  });

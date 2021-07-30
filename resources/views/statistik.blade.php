@extends('layout.base')

@section('tittle',  'C-19 | Statistik')

@section('content')
    @include('layout.header')
    <div class="container-fluid">
        <div class="row">
            {{-- Include The Sidebar --}}
            @include('layout.sidebar')
            {{-- Main Content --}}
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                {{-- Table --}}
                <h2>COVID-19 Data</h2>
                <div class="table-responsive">
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr class="table-dark text-md-center">
                                <th scope="col">#</th>
                                <th scope="col">Negara</th>
                                <th scope="col">Populasi</th>
                                <th scope="col">Luas Wilayah</th>
                                <th scope="col">Terkonfirmasi</th>
                                <th scope="col">Sembuh</th>
                                <th scope="col">Meninggal</th>
                            </tr>
                        </thead>
                        <tbody>
                        @foreach ($cases as $index => $case)
                            <tr>
                                <td scope="row">{{$loop->iteration}}</td>
                                <td >@isset($case["All"]["country"]){{ $case["All"]["country"] }}@endisset</td>
                                <td class="text-end">@isset($case["All"]["population"]){{ number_format($case["All"]["population"]) }}@endisset</td>
                                <td class="text-end">@isset($case["All"]["sq_km_area"]){{ number_format($case["All"]["sq_km_area"]) }}@endisset</td>
                                <td class="text-end">@isset($case["All"]["confirmed"]){{ number_format($case["All"]["confirmed"]) }}@endisset</td>
                                <td class="text-end">@isset($case["All"]["recovered"]){{ number_format($case["All"]["recovered"]) }}@endisset</td>
                                <td class="text-end">@isset($case["All"]["deaths"]){{ number_format($case["All"]["deaths"]) }}@endisset</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    </div>
@endsection